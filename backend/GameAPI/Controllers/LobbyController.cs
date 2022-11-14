using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameAPI.Data.Lobby;
using GameAPI.Model;

namespace GameAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LobbyController : ControllerBase
{
    public LobbyController(ILobbyRepository repository)
    {
        _repository = repository;
    }

    public readonly ILobbyRepository _repository;

    // GET api/lobby
    [HttpGet]
    public async Task<ActionResult<ICollection<LobbyModel>>> GetLobbyListAsync()
    {
        var lobbyList = await _repository.GetLobbyListAsync();
        if (lobbyList is null)
        {
            return NotFound();
        }
        return Ok(lobbyList);
    }

    // GET api/lobby/{id}
    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<LobbyModel>> GetLobbyByIdAsync([FromRoute] Guid id)
    {
        var lobbyFromRepo = await _repository.GetLobbyByIdAsync(id);
        if (lobbyFromRepo is null)
        {
            return NotFound();
        }
        return Ok(lobbyFromRepo);
    }

    // POST api/lobby
    [HttpPost]
    public async Task<ActionResult> CreateLobbyAsync([FromBody] LobbyModel lobbyModel)
    {
        await _repository.CreateLobbyAsync(lobbyModel);

        await _repository.SaveChangesAsync();

        return NoContent();
    }

    // PUT api/lobby/id
    [HttpPut("{id:Guid}")]
    public async Task<ActionResult> UpdateLobbyAsync([FromRoute] Guid id, [FromBody] LobbyModel lobbyModel)
    {
        var model = await _repository.GetLobbyByIdAsync(id);
        if(model is null){
            return NotFound();
        }
        // model.Name = lobbyModel.Name ?? model.Name;
        // model.Picture = lobbyModel.Picture ?? model.Picture;
        // model.Price = lobbyModel.Price ?? model.Price;
        // model.Description = lobbyModel.Description ?? model.Description;
        // model.Quantity = lobbyModel.Quantity ?? model.Quantity;
        // model.Discount = lobbyModel.Discount ?? model.Discount;
        // model.Type = lobbyModel.Type ?? model.Type;

        model.Name = !String.IsNullOrEmpty(lobbyModel.Name) ? lobbyModel.Name : model.Name;
        model.Level = lobbyModel.Level ?? model.Level;

        await _repository.UpdateLobbyAsync(model);

        await _repository.SaveChangesAsync();

        return NoContent();
    }

    // PUT api/lobby/id/add/playerId
    [HttpGet("{id:Guid}/add/{playerId:Guid}")]
    public async Task<ActionResult<Guid>> AddPlayerToLobbyAsync([FromRoute] Guid id, [FromRoute] Guid playerId)
    {
        var model = await _repository.GetLobbyByIdAsync(id);
        if(model is null){
            return NotFound();
        }

        if(model.Player1 is null){
            model.Player1 = playerId;
        }
        else if(model.Player2 is null){
            model.Player2 = playerId;
        }
        else{
            return StatusCode(406);
        }

        await _repository.UpdateLobbyAsync(model);

        await _repository.SaveChangesAsync();

        return Ok(playerId);
    }

    // PUT api/lobby/id/remove/playerId
    [HttpDelete("{id:Guid}/remove/{playerId:Guid}")]
    public async Task<ActionResult> RemovePlayerFromLobbyAsync([FromRoute] Guid id, [FromRoute] Guid playerId)
    {
        var model = await _repository.GetLobbyByIdAsync(id);
        if(model is null){
            return NotFound();
        }
        if(model.Player1 == playerId){
            model.Player1 = null;
        }
        else if(model.Player2 == playerId){
            model.Player2 = null;
        }
        else{
            return NotFound();
        }
        await _repository.UpdateLobbyAsync(model);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    // Delete api/lobby/{id}
    [HttpDelete("{id:Guid}")]
    public async Task<ActionResult> DeleteLobbyByIdAsync([FromRoute] Guid id)
    {
        var lobby = await _repository.GetLobbyByIdAsync(id);
        if (lobby is null)
            return NotFound("Not a valid lobby id");
        await _repository.DeleteLobbyAsync(lobby);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
