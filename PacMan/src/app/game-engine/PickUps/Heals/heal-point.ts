import Heal from './heals'

export default class Heal_Point extends Heal {
  constructor() {
      super()
      this.name = "Heal Point"
      this.heal_points = 2
  }
}
