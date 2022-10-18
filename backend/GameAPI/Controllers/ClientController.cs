using System.Collections.Generic;
using AutoMapper;
using GameAPI.Hubs;
using GameAPI.Model;
using GameAPI.Data.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace GameAPI.Controllers
{
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly IClientRepository _clientRepository;
        private readonly IHubContext<ChatHub> _chatHubContext;

        public ClientController(
            IClientRepository clientRepository,
            IHubContext<ChatHub> hubContext,
             IMapper mapper)
        {
            _clientRepository = clientRepository;
            _chatHubContext = hubContext;
        }

        [HttpGet]
        public ActionResult<List<ClientModel>> GetAllFoods()
        {
            var foods = _clientRepository.GetAll();
            return Ok(foods);
        }

        [HttpGet]
        [Route("{id:Guid}", Name = nameof(GetSingleFood))]
        public ActionResult<ClientModel> GetSingleFood(Guid id)
        {
            ClientModel foodItem = _clientRepository.GetSingle(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            return Ok(foodItem);
        }

        [HttpPost]
        public ActionResult AddFoodToList([FromBody] ClientModel viewModel)
        {
            if (viewModel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ClientModel item = viewModel;
            item.Created = DateTime.Now;
            ClientModel newFoodItem = _clientRepository.Add(item);

            _chatHubContext.Clients.All.SendAsync("FoodAdded", newFoodItem);

            return CreatedAtRoute(
                nameof(GetSingleFood),
                new { id = newFoodItem.Id },
                newFoodItem);
        }

        [HttpPut]
        [Route("{foodItemId:Guid}")]
        public ActionResult<ClientModel> UpdateFoodInList(Guid foodItemId, [FromBody] ClientModel viewModel)
        {
            if (viewModel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            ClientModel singleById = _clientRepository.GetSingle(foodItemId);

            if (singleById == null)
            {
                return NotFound();
            }

            singleById.Name = viewModel.Name;

            ClientModel newFoodItem = _clientRepository.Update(singleById);
            _chatHubContext.Clients.All.SendAsync("FoodUpdated", newFoodItem);
            return Ok(newFoodItem);
        }

        [HttpDelete]
        [Route("{foodItemId:Guid}")]
        public ActionResult DeleteFoodFromList(Guid foodItemId)
        {

            ClientModel singleById = _clientRepository.GetSingle(foodItemId);

            if (singleById == null)
            {
                return NotFound();
            }

            _clientRepository.Delete(foodItemId);

            _chatHubContext.Clients.All.SendAsync("FoodDeleted");
            return NoContent();
        }
    }
}
