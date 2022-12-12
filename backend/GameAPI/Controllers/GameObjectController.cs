using System.Collections.Generic;

using GameAPI.Hubs;
using GameAPI.Model;
using GameAPI.Data.GameObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using GameAPI.Context;
using  Microsoft.EntityFrameworkCore;

namespace GameAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameObjectController : ControllerBase
{
    //private readonly IGameObjectRepository _clientRepository;
    //private readonly MemoryContext _context;

    private readonly IHubContext<ChatHub> _chatHubContext;
    public readonly IGameObjectRepository _repository;

    public GameObjectController(IGameObjectRepository repository, IHubContext<ChatHub> hubContext)
    {
        _repository = repository;
        _chatHubContext = hubContext;
    }

    // GET api/client
    [HttpGet]
    public async Task<ActionResult<ICollection<GameObjectModel>>> GetGameObjectListAsync()
    {
        var list = await _repository.GetGameObjectListAsync();
        if (list is null)
        {
            return NotFound();
        }
        return Ok(list);
    }

    // GET api/client/{id}
    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<GameObjectModel>> GetGameObjectByIdAsync([FromRoute] Guid id)
    {
        var result = await _repository.GetGameObjectByIdAsync(id);
        if (result is null)
        {
            return NotFound();
        }
        return Ok(result);
    }

        // POST api/client
    [HttpPost]
    public async Task<ActionResult> CreateGameObjectAsync([FromBody] GameObjectModel request)
    {
        if (request == null)
        {
            return BadRequest();
        }
        await _repository.CreateGameObjectAsync(request);

        await _repository.SaveChangesAsync();

        //await _chatHubContext.GameObjects.All.SendAsync("FoodAdded", request);

        //return Ok(request);
        return Created(nameof(request), request);
    }

    // PUT api/client/id
    [HttpPut("{id:Guid}")]
    public async Task<ActionResult> UpdateGameObjectAsync([FromRoute] Guid id, [FromBody] GameObjectModel request)
    {
        var model = await _repository.GetGameObjectByIdAsync(id);
        if(model is null){
            return NotFound();
        }

        model.Name = !String.IsNullOrEmpty(request.Name) ? request.Name : model.Name;
        model.X = request.X != null ? request.X : model.X;
        model.Y = request.Y != null ? request.Y : model.Y;
        model.Parameters = !String.IsNullOrEmpty(request.Parameters) ? request.Parameters : model.Parameters;
        

        await _repository.UpdateGameObjectAsync(model);

        await _repository.SaveChangesAsync();

        //await _chatHubContext.GameObjects.All.SendAsync("FoodUpdated", model);

        return Ok(model);
    }

    // Delete api/client/{id}
    [HttpDelete("{id:Guid}")]
    public async Task<ActionResult> DeleteGameObjectByIdAsync([FromRoute] Guid id)
    {

        var client = await _repository.GetGameObjectByIdAsync(id);
        if (client is null)
            return NotFound("Not a valid client id");

        await _repository.DeleteGameObjectAsync(client);

        await _repository.SaveChangesAsync();

        //await _chatHubContext.GameObjects.All.SendAsync("FoodDeleted");

        

        return NoContent();
    }
}

