import { ANIMAIS_INFO } from "./animaisinfo";
class Animal {
    constructor(nome) {
        const infoAnimal = ANIMAIS_INFO[nome];
        if (!infoAnimal) {
            throw new Error('Animal inválido');
        }

        this.nome = nome;
        this.eCarnivoro = infoAnimal.eCarnivoro;
        this.tamanho = infoAnimal.tamanho;
        this.biomas = infoAnimal.biomas;
    }

    podeCoabitarCom(outroAnimal) {
        if (this.eCarnivoro) {
            return this.nome === outroAnimal.nome;
        }
        
     
        if (outroAnimal.eCarnivoro) {
            return false;
        }

        return true;
    }

    
}

export { Animal };
