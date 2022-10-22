using System.Collections.Generic;

using GameAPI.Hubs;
using GameAPI.Model;
using GameAPI.Data.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using GameAPI.Context;
using  Microsoft.EntityFrameworkCore;

namespace GameAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    //private readonly IClientRepository _clientRepository;
    //private readonly MemoryContext _context;

    private readonly IHubContext<ChatHub> _chatHubContext;
    public readonly IClientRepository _repository;

    public ClientController(IClientRepository repository, IHubContext<ChatHub> hubContext)
        {
            _repository = repository;
            _chatHubContext = hubContext;
        }

        
        // GET api/client
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientModel>>> GetClientListAsync()
        {
            var list = await _repository.GetClientListAsync();
            if (list is null)
            {
                return NotFound();
            }
            return Ok(list);
        }


        // GET api/client/{id}
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ClientModel>> GetClientByIdAsync([FromRoute] Guid id)
        {
            var result = await _repository.GetClientByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // POST api/client
        [HttpPost]
        public async Task<ActionResult> CreateClientAsync([FromBody] ClientModel request)
        {
            if (request == null)
            {
                return BadRequest();
            }
            await _repository.CreateClientAsync(request);

            await _repository.SaveChangesAsync();

            await _chatHubContext.Clients.All.SendAsync("FoodAdded", request);

            //return Ok(request);
            return NoContent();
        }

        // PUT api/client/id
        [HttpPut("{id:Guid}")]
        public async Task<ActionResult> UpdateClientAsync([FromRoute] Guid id, [FromBody] ClientModel request)
        {
            var model = await _repository.GetClientByIdAsync(id);
            if(model is null){
                return NotFound();
            }

            model.Name = !String.IsNullOrEmpty(request.Name) ? request.Name : model.Name;
            if(request.LobbyId == new Guid())
            {
                model.LobbyId = null;
            }
            else{
                model.LobbyId = request.LobbyId ?? model.LobbyId;
            }
            

            await _repository.UpdateClientAsync(model);

            await _repository.SaveChangesAsync();

            await _chatHubContext.Clients.All.SendAsync("FoodUpdated", model);

            return Ok(model);
        }


        // Delete api/client/{id}
        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult> DeleteClientByIdAsync([FromRoute] Guid id)
        {

            var client = await _repository.GetClientByIdAsync(id);
            if (client is null)
                return NotFound("Not a valid client id");

            await _repository.DeleteClientAsync(client);

            await _repository.SaveChangesAsync();

            await _chatHubContext.Clients.All.SendAsync("FoodDeleted");

            

            return NoContent();
        }











    // // public ClientController(MemoryContext context, IHubContext<ChatHub> hubContext)
    // // {
    // //     _context = context;
    // //     _chatHubContext = hubContext;
    // // }
    // public ClientController(IClientRepository clientRepository, IHubContext<ChatHub> hubContext)
    // {
    //     _clientRepository = clientRepository;
    //     _chatHubContext = hubContext;
    // }

    // // // GET: api/Clients
    // // [HttpGet]
    // // public async Task<ActionResult<IEnumerable<ClientModel>>> GetUsers()
    // // {
    // //     return await _context.Clients.ToListAsync();
    // // }

    // [HttpGet]
    // public async Task<ActionResult<List<ClientModel>>> GetClientListAsync()
    // {
    //     var clients = await _clientRepository.GetClientListAsync();
    //     return Ok(clients);
    // }

    // [HttpGet]
    // [Route("{id:Guid}", Name = nameof(GetClientByIdAsync))]
    // public async Task<ActionResult<ClientModel>> GetClientByIdAsync([FromRoute] Guid id)
    // {
    //     var result = await _clientRepository.GetClientByIdAsync(id);

    //     if (result == null)
    //     {
    //         return NotFound();
    //     }

    //     return Ok(result);
    // }

    // // [HttpPost]
    // // public async Task<ActionResult<ClientModel>> PostStudent(ClientModel student)
    // // {
    // //     _context.Clients.Add(student);
    // //     await _context.SaveChangesAsync();

    // //     //return CreatedAtAction("GetClient", new { id = student.Id }, student);
    // //     return NoContent();
    // // }

    // [HttpPost]
    // public async Task<ActionResult> CreateClientAsync([FromBody] ClientModel request)
    // {
    //     if (request == null)
    //     {
    //         return BadRequest();
    //     }

    //     // if (!ModelState.IsValid)
    //     // {
    //     //     return BadRequest(ModelState);
    //     // }

    //     ClientModel model = request;
    //     model.Created = DateTime.Now;
    //     ClientModel newModel = await _clientRepository.CreateClientAsync(model);

    //     await _chatHubContext.Clients.All.SendAsync("FoodAdded", newModel);

    //     return Created(nameof(request), request);
    // }

    // [HttpPut]
    // [Route("{id:Guid}")]
    // public async Task<ActionResult<ClientModel>> UpdateClientAsync([FromRoute] Guid id, [FromBody] ClientModel model)
    // {
    //     if (model == null)
    //     {
    //         return BadRequest();
    //     }

    //     // if (!ModelState.IsValid)
    //     // {
    //     //     return BadRequest(ModelState);
    //     // }


    //     ClientModel result = await _clientRepository.GetClientByIdAsync(id);

    //     if (result == null)
    //     {
    //         return NotFound();
    //     }

    //     result.Name = model.Name;

    //     ClientModel newModel = await _clientRepository.UpdateClientAsync(result);
    //     await _chatHubContext.Clients.All.SendAsync("FoodUpdated", newModel);
    //     return Ok(newModel);
    // }

    // [HttpDelete]
    // [Route("{id:Guid}")]
    // public async Task<ActionResult> DeleteClientAsync([FromRoute] Guid id)
    // {

    //     ClientModel result = await _clientRepository.GetClientByIdAsync(id);

    //     if (result == null)
    //     {
    //         return NotFound();
    //     }

    //     await _clientRepository.DeleteClientAsync(id);

    //     await _chatHubContext.Clients.All.SendAsync("FoodDeleted");
    //     return NoContent();
    // }
}

