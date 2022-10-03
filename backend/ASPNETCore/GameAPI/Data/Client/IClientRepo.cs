using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Model;

namespace GameAPI.Data.Client
{
    public interface IClientRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<ClientModel>> GetClientListAsync();
        Task<ClientModel> GetClientByIdAsync(Guid id);
        Task CreateClientAsync(ClientModel clientModel);
        Task UpdateClientAsync(ClientModel clientModel);
        Task DeleteClientAsync(ClientModel clientModel);
    }
}