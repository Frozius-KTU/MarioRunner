using System.Collections.Generic;
using System.Threading.Tasks;
using GameAPI.Model;

namespace GameAPI.Data.Map
{
    public interface IMapRepository
    {
        Task SaveChangesAsync();
        Task<ICollection<MapModel>> GetMapListAsync();
        Task<MapModel> GetMapByIdAsync(Guid id);
        Task CreateMapAsync(MapModel request);
        Task UpdateMapAsync(MapModel request);
        Task DeleteMapAsync(MapModel request);
    }
}