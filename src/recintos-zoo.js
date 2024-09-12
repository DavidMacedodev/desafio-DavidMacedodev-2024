import { Recinto } from './recinto.js';
import { Animal } from './animais.js';

class RecintosZoo {
    constructor() {
        this.recintos = [
            new Recinto(1, "savana", 10, [{ nome: "MACACO", quantidade: 3 }]),
            new Recinto(2, "floresta", 5),
            new Recinto(3, "savana e rio", 7, [{ nome: "GAZELA", quantidade: 1 }]),
            new Recinto(4, "rio", 8),
            new Recinto(5, "savana", 9, [{ nome: "LEAO", quantidade: 1 }])
        ];
    }

    analisaRecintos(animalNome, quantidade) {
        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

       
        try {
        new Animal(animalNome.toUpperCase());
        } catch {
            return { erro: "Animal inválido" };
        }

        const recintosViaveis = this.recintos
            .filter(recinto => recinto.podeAdicionarAnimal(animalNome.toUpperCase(), quantidade))
            .map(recinto => 
                `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivreAposAdicao(animalNome, quantidade)} total: ${recinto.tamanhoTotal})`
            );

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
