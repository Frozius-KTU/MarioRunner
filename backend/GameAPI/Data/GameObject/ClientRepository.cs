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
    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
    public async Task<ICollection<GameObjectModel>> GetGameObjectListAsync()
    {
        var list = _context.GameObjects.ToList();
        return await Task.FromResult(list);
    }
    public async Task<GameObjectModel> GetGameObjectByIdAsync(Guid id)
    {
        GameObjectModel result = await _context.GameObjects.FirstOrDefaultAsync(x => x.Id == id);
        return result;
    }
    public async Task CreateGameObjectAsync(GameObjectModel request)
    {
        await _context.GameObjects.AddAsync(request);
    }
    public async Task UpdateGameObjectAsync(GameObjectModel request)
    {
        await Task.CompletedTask;
    }
    public async Task DeleteGameObjectAsync(GameObjectModel request)
    {
        if (request is null)
        {
            throw new ArgumentException(nameof(request));
        }
        await Task.FromResult(_context.GameObjects.Remove(request));
    }
}
