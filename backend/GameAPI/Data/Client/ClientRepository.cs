using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Context;
using GameAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace GameAPI.Data.Client
{
    public class ClientRepository : IClientRepository
    {
        
        public ClientRepository(MemoryContext context)
        {
            _context = context;
        }
        private readonly MemoryContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ClientModel>> GetClientListAsync()
        {
            var list = _context.Clients.ToList();

            return await Task.FromResult(list);
        }
        public async Task<ClientModel> GetClientByIdAsync(Guid id)
        {
            ClientModel result = await _context.Clients.FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }


        public async Task CreateClientAsync(ClientModel request)
        {
            await _context.Clients.AddAsync(request);
        }

        public async Task UpdateClientAsync(ClientModel request)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteClientAsync(ClientModel request)
        {
            if (request is null)
            {
                throw new ArgumentException(nameof(request));
            }
            await Task.FromResult(_context.Clients.Remove(request));

        }







        //private Dictionary<Guid, ClientModel> _clients = new Dictionary<Guid, ClientModel>();

        // public ClientRepository()
        // {
        //     // id = Guid.NewGuid();

        //     // _clients.Add(Guid.NewGuid(), new ClientModel() { Name = "Spaghetti Bolognese", Id = Guid.NewGuid(), Created = DateTime.Now});
        // }

        // public async Task<List<ClientModel>> GetClientListAsync()
        // {
        //     //return _clients.Select(x => x.Value).ToList();
        //     var list = _clients.Select(x => x.Value).ToList();
        //     return await Task.FromResult(list);
        // }

        // public async Task<ClientModel> GetClientByIdAsync(Guid id)
        // {
        //     var result = _clients.FirstOrDefault(x => x.Key == id).Value;
        //     Console.WriteLine("!!!!!!!!!!!    " + id);
        //     Console.WriteLine("!!!!!!!!!!!    " + _clients.FirstOrDefault(x => x.Key == id).Value.Name);
        //     return await Task.FromResult(result);
        // }

        // public async Task<ClientModel> CreateClientAsync(ClientModel request)
        // {
        //     Guid newId = Guid.NewGuid();
        //     request.Id = newId;
        //     _clients.Add(newId, request);
        //     Console.WriteLine("!!!!!!!!!!!    " + newId);
        //     Console.WriteLine("!!!!!!!!!!!    " + _clients.FirstOrDefault(x => x.Key == newId).Value.Name);
        //     return await Task.FromResult(request);
        // }

        // public async Task<ClientModel> UpdateClientAsync(ClientModel request)
        // {
        //     var result = GetClientByIdAsync(request.Id);
        //     if (result == null)
        //     {
        //         return null;
        //     }

        //     _clients[request.Id] = request;
        //     return await Task.FromResult(request);
        // }

        // public async Task DeleteClientAsync(Guid id)
        // {
        //     var result = GetClientByIdAsync(id);
        //     if (result == null)
        //     {
        //         throw new ArgumentException(nameof(id));
        //     }

        //     await Task.FromResult(_clients.Remove(id));
        // }
    }
}