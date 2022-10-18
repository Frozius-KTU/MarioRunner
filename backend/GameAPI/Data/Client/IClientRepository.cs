using System.Collections.Generic;
using GameAPI.Model;

namespace GameAPI.Data.Client
{
    public interface IClientRepository
    {
        List<ClientModel> GetAll();
        ClientModel GetSingle(Guid id);
        ClientModel Add(ClientModel toAdd);
        ClientModel Update(ClientModel toUpdate);
        void Delete(Guid id);
    }
}
