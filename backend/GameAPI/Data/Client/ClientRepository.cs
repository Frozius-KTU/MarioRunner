using System;
using System.Collections.Generic;
using System.Linq;
using GameAPI.Model;

namespace GameAPI.Data.Client
{
    public class ClientRepository : IClientRepository
    {
        readonly Dictionary<Guid, ClientModel> _clients = new Dictionary<Guid, ClientModel>();

        public ClientRepository()
        {
            //id = Guid.NewGuid();

            //_clients.Add(Guid.NewGuid(), new ClientModel() { Name = "Spaghetti Bolognese", Id = Guid.NewGuid(), Created = DateTime.Now});
        }

        public List<ClientModel> GetAll()
        {
            return _clients.Select(x => x.Value).ToList();
        }

        public ClientModel GetSingle(Guid id)
        {
            return _clients.FirstOrDefault(x => x.Key == id).Value;
        }

        public ClientModel Add(ClientModel toAdd)
        {
            Guid newId = Guid.NewGuid();
            toAdd.Id = newId;
            _clients.Add(newId, toAdd);
            return toAdd;
        }

        public ClientModel Update(ClientModel toUpdate)
        {
            ClientModel single = GetSingle(toUpdate.Id);

            if (single == null)
            {
                return null;
            }

            _clients[single.Id] = toUpdate;
            return toUpdate;
        }

        public void Delete(Guid id)
        {
            _clients.Remove(id);
        }
    }
}