using System.Collections.Generic;
using System.Threading.Tasks;
using GameAPI.Model;

namespace GameAPI.Data.GameObject;
public interface IGameObjectRepository
{
    Task SaveChangesAsync();
    Task<ICollection<GameObjectModel>> GetGameObjectListAsync();
    Task<GameObjectModel> GetGameObjectByIdAsync(Guid id);
    Task CreateGameObjectAsync(GameObjectModel request);
    Task UpdateGameObjectAsync(GameObjectModel request);
    Task DeleteGameObjectAsync(GameObjectModel request);
}

