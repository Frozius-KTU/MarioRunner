using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameAPI.Data.Map;
using GameAPI.Model;

namespace GameAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapController : ControllerBase
    {
        public MapController(IMapRepository repository)
        {
            _repository = repository;
        }

        public readonly IMapRepository _repository;

        // GET api/map
        [HttpGet]
        public async Task<ActionResult<ICollection<MapModel>>> GetMapListAsync()
        {
            var list = await _repository.GetMapListAsync();
            if (list is null)
            {
                return NotFound();
            }
            return Ok(list);
        }


        // GET api/map/{id}
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<MapModel>> GetMapByIdAsync([FromRoute] Guid id)
        {
            var mapFromRepo = await _repository.GetMapByIdAsync(id);
            if (mapFromRepo is null)
            {
                return NotFound();
            }
            return Ok(mapFromRepo);
        }

        // POST api/map
        [HttpPost]
        public async Task<ActionResult> CreateMapAsync([FromBody] MapModel mapModel)
        {
            await _repository.CreateMapAsync(mapModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/map/id
        [HttpPut("{id:Guid}")]
        public async Task<ActionResult> UpdateMapAsync([FromRoute] Guid id, [FromBody] MapModel mapModel)
        {
            var model = await _repository.GetMapByIdAsync(id);
            if(model is null){
                return NotFound();
            }

            model.Name = !String.IsNullOrEmpty(mapModel.Name) ? mapModel.Name : model.Name;
            model.Map = mapModel.Map ?? model.Map;

            await _repository.UpdateMapAsync(model);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // Delete api/map/{id}
        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult> DeleteMapByIdAsync([FromRoute] Guid id)
        {

            var map = await _repository.GetMapByIdAsync(id);
            if (map is null)
                return NotFound("Not a valid map id");

            await _repository.DeleteMapAsync(map);

            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}