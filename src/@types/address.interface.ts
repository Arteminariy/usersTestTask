import { IGeo } from "./geo.interface"

export type IAddress = {
	street: string,
	suite: string,
	city: string,
	zipcode: string,
	geo: IGeo
}