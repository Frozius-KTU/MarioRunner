using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Model;
using Microsoft.EntityFrameworkCore;
using GameAPI.Context;

namespace GameAPI.Data.Client
{
    public class SqlClientRepo : IClientRepo
    {
        public SqlClientRepo(GameContext context)
        {
            _context = context;
        }
        private readonly GameContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ClientModel>> GetClientListAsync()
        {
            var clientList = _context.Clients.ToList();

            return await Task.FromResult(clientList);
        }
        public async Task<ClientModel> GetClientByIdAsync(Guid id)
        {
            ClientModel client = await _context.Clients.FirstOrDefaultAsync(x => x.Id == id);
            return client;
        }


        public async Task CreateClientAsync(ClientModel clientModel)
        {
            await _context.Clients.AddAsync(clientModel);
        }

        public async Task UpdateClientAsync(ClientModel clientModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteClientAsync(ClientModel client)
        {
            if (client is null)
            {
                throw new ArgumentException(nameof(client));
            }
            await Task.FromResult(_context.Clients.Remove(client));

        }

    }
}