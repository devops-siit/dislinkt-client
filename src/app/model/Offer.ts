import { Company } from "./Company";

export class Offer{
    uuid?: string;
    position?: string;
    description?: string;
    prerequisites?: string[];
    company?: Company;
}