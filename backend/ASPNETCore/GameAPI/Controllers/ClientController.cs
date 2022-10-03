using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameAPI.Data.Client;
using GameAPI.Model;

namespace GameAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        public ClientController(IClientRepo repository)
        {
            _repository = repository;
        }

        public readonly IClientRepo _repository;

        // GET api/client
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientModel>>> GetClientListAsync()
        {
            var clientList = await _repository.GetClientListAsync();
            if (clientList is null)
            {
                return NotFound();
            }
            return Ok(clientList);
        }


        // GET api/client/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientModel>> GetClientByIdAsync([FromRoute] Guid id)
        {
            var clientFromRepo = await _repository.GetClientByIdAsync(id);
            if (clientFromRepo is null)
            {
                return NotFound();
            }
            return Ok(clientFromRepo);
        }

        // POST api/client
        [HttpPost]
        public async Task<ActionResult> CreateClientAsync([FromBody] ClientModel clientModel)
        {
            await _repository.CreateClientAsync(clientModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/client
        [HttpPut]
        public async Task<ActionResult> UpdateClientAsync([FromBody] ClientModel clientModel)
        {
            var model = await _repository.GetClientByIdAsync(clientModel.Id.Value);
            // model.Name = clientModel.Name ?? model.Name;
            // model.Picture = clientModel.Picture ?? model.Picture;
            // model.Price = clientModel.Price ?? model.Price;
            // model.Description = clientModel.Description ?? model.Description;
            // model.Quantity = clientModel.Quantity ?? model.Quantity;
            // model.Discount = clientModel.Discount ?? model.Discount;
            // model.Type = clientModel.Type ?? model.Type;

            model.Name = !String.IsNullOrEmpty(clientModel.Name) ? clientModel.Name : model.Name;
            model.Lobby = clientModel.Lobby != null ? clientModel.Lobby : model.Lobby;


            await _repository.UpdateClientAsync(model);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // Delete api/client/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClientByIdAsync([FromRoute] Guid id)
        {

            var client = await _repository.GetClientByIdAsync(id);
            if (client is null)
                return NotFound("Not a valid client id");

            await _repository.DeleteClientAsync(client);

            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}