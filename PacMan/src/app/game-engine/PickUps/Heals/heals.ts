interface IHeal {
  name: string
  heal_points: number
  getProperties(): any
}

export default class Heal implements IHeal {
  name = ""
  heal_points = 0

  getProperties(){
      return {
          name: this.name,
          heal_points: this.heal_points,
      }
  }
}
