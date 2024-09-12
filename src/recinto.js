import { Animal } from './animais.js';

class Recinto {
    constructor(numero, bioma, tamanhoTotal, animaisExistentes = []) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoTotal = tamanhoTotal;
        this.animaisExistentes = animaisExistentes; 
    }

    espacoLivre() {
       
        
        const espacoOcupado = this.animaisExistentes.reduce((total, animal) => {
            const animalInstancia = new Animal(animal.nome);
            return total + (animalInstancia.tamanho * animal.quantidade);
        }, 0);
        return this.tamanhoTotal - espacoOcupado;
    }

    espacoLivreAposAdicao(animalNome, quantidade) {
        
        const espacoAtual = this.espacoLivre();
        const animal = new Animal(animalNome);
        const espacoNecessario = animal.tamanho * quantidade;

       
        const especiesAtuais = new Set(this.animaisExistentes.map(a => a.nome));


        const especieJaExistente = especiesAtuais.has(animalNome);


        const ajusteEspaco = (especiesAtuais.size > 0 && !especieJaExistente) ? 1 : 0;

       
        return espacoAtual - espacoNecessario - ajusteEspaco;
    }

    podeAdicionarAnimal(animalNome, quantidade) {
        try {
            const animal = new Animal(animalNome);

      
            
            const biomasRecinto = this.bioma.split(" e ");
            const podeViverNoBioma = biomasRecinto.some(bioma => animal.biomas.includes(bioma));
    
            if (!podeViverNoBioma) return false;
          
            for (const existente of this.animaisExistentes) {
                const animalExistente = new Animal(existente.nome);
                if (!animal.podeCoabitarCom(animalExistente)) return false;
            }
            
            if(this.animaisExistentes.length === 0 && animalNome === 'MACACO' && quantidade === 1){
                return false;
            }

            if(this.bioma !== 'savana e rio' && animalNome === 'HIPOPOTAMO' && this.animaisExistentes.length > 0){
                return false;
            }
            return this.espacoLivreAposAdicao(animalNome, quantidade) >= 0;
        } catch (e) {
            return false;
        }
    }
}

export { Recinto as Recinto };
