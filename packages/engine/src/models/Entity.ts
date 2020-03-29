/**
 * Represents a domain entity
 */
export default class Entity {
  constructor(private id: string) {}

  public getId() {
    return this.id
  }
}
