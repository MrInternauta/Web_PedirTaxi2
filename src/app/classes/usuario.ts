export class Usuario {
         public name: string;
         public lastname: string;
         public email: string;
         public phone: number;
         public role: string;
         public status: string;
         public type: string;
        public img: string;
         public __v: number;
         public _id: string;

    constructor(valor: {name: string,
                lastname: string,
                email: string,
                phone: number,
                role: string,
                status: string,
                type: string,
                img: string,
                __v: number,
                _id: string} ) {
        this.name = valor.name;
        this.lastname = valor.lastname;
        this.email = valor.email;
        this.phone = valor.phone;
        this.role = valor.role;
        this.status = valor.status;
        this.type = valor.type;
        this.img = valor.img;
        this.__v = valor.__v;
        this._id = valor._id;
         }

    verificar(valor: {
        name: string,
        lastname: string,
        email: string,
        phone: number,
        role: string,
        status: string,
        type: string,
        img: string,
        __v: number,
        _id: string
    }) {
        this.name = valor.name;
        this.lastname = valor.lastname;
        this.email = valor.email;
        this.phone = valor.phone;
        this.role = valor.role;
        this.status = valor.status;
        this.type = valor.type;
        this.img = valor.img;
        this.__v = valor.__v;
        this._id = valor._id;
    if (
        !this.name ||
        !this.lastname ||
        !this.email  ||
        !this.phone ||
        !this.role ||
        !this.status ||
        !this.type


        ) { return false; } else {
            return true;
        }

         }
}
