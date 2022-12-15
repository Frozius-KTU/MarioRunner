using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Context;
using GameAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace GameAPI.Data.GameObject;
public class GameObjectRepository : IGameObjectRepository
{
    public GameObjectRepository(MemoryContext context)
    {
        _context = context;
    }
    private readonly MemoryContext _context;
    public Task SaveChanges()
    {
        return _context.SaveChangesAsync();
    }
    public async Task<ICollection<GameObjectModel>> GetGameObjectList()
    {
        var list = _context.GameObjects.ToList();
        return await Task.FromResult(list);
    }
    public async Task<GameObjectModel> GetGameObjectById(Guid id)
    {
        GameObjectModel result = await _context.GameObjects.FirstOrDefaultAsync(x => x.Id == id);
        return result;
    }
    public async Task<ICollection<GameObjectModel>> GetGameObjectsByLobbyId(Guid lobbyId)
    {
        var result = _context.GameObjects.Where(x => x.LobbyId == lobbyId).ToList();
        return await Task.FromResult(result);
    }
    public async Task<GameObjectModel> GetGameObjectByLobbyIdAndName(Guid lobbyId, string name)
    {
        GameObjectModel result = await _context.GameObjects.FirstOrDefaultAsync(x => x.LobbyId == lobbyId && x.Name == name);
        return result;
    }
    public async Task CreateGameObject(GameObjectModel request)
    {
        await _context.GameObjects.AddAsync(request);
    }
    public async Task UpdateGameObject(GameObjectModel request)
    {
        await Task.CompletedTask;
    }
    public async Task DeleteGameObject(GameObjectModel request)
    {
        if (request is null)
        {
            throw new ArgumentException(nameof(request));
        }
        await Task.FromResult(_context.GameObjects.Remove(request));
    }
}
