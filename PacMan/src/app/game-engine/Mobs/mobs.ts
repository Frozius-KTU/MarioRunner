interface IMob {
  name: string
  dmg_points: number
  getProperties(): any
}

export default class Mob implements IMob {
  name = ""
  dmg_points = 0

  getProperties(){
      return {
          name: this.name,
          dmg_points: this.dmg_points,
      }
  }
}
