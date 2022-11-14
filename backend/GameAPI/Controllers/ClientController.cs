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
    public async Task<ActionResult<ICollection<ClientModel>>> GetClientListAsync()
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

        //await _chatHubContext.Clients.All.SendAsync("FoodAdded", request);

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
        model.Active =  request.Active;
        if(request.LobbyId == new Guid())
        {
            model.LobbyId = null;
        }
        else{
            model.LobbyId = request.LobbyId ?? model.LobbyId;
        }
        

        await _repository.UpdateClientAsync(model);

        await _repository.SaveChangesAsync();

        //await _chatHubContext.Clients.All.SendAsync("FoodUpdated", model);

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

        //await _chatHubContext.Clients.All.SendAsync("FoodDeleted");

        

        return NoContent();
    }
}

