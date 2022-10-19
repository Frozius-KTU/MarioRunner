using System.Collections.Generic;
using System.Threading.Tasks;
using GameAPI.Model;

namespace GameAPI.Data.Client
{
    public interface IClientRepository
    {
        Task SaveChangesAsync();
        Task<IEnumerable<ClientModel>> GetClientListAsync();
        Task<ClientModel> GetClientByIdAsync(Guid id);
        Task CreateClientAsync(ClientModel request);
        Task UpdateClientAsync(ClientModel request);
        Task DeleteClientAsync(ClientModel request);
    }
}
