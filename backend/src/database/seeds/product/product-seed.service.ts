import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/products/product.entity';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async run() {
    const defaultProds = [
      {
        name: 'Betoneira 150 litros',
        description:
          'As betoneiras são projetadas para realizar os trabalhos mais exigentes.',
        imageUrl: 'betoneira.jpg',
        value: 70,
      },
      {
        name: 'Misturador',
        description:
          'O Misturador para concreto e argamassa é uma grande inovação em produtividade e segurança, oferecendo maior qualidade e agilidade no preparo da mistura de concreto.',
        imageUrl: 'misturador.jpg',
        value: 65,
      },
      {
        name: 'Martelete Perfurador 2kg',
        description:
          'O martelete perfurador de 2 kg é utilizar para executar furos em concreto, pedras e refratários.',
        imageUrl: 'martelete.jpg',
        value: 50,
      },
      {
        name: 'Painel Metálico Andaime 1m',
        description:
          'Estes painéis metálicos para andaime possuem 1 metro e auxiliam no desenvolvimento vertical das construções, ou também para efeito de reparos, reformas, pinturas, torres de acesso e outros.',
        imageUrl: 'andaime.jpg',
        value: 50,
      },
      {
        name: 'Escada para Andaime 1m',
        description:
          'As escadas para andaime são peças necessárias para dar acesso ao nível de trabalho.',
        imageUrl: 'escada.jpg',
        value: 20,
      },
      {
        name: 'Guarda-Corpo para Andaime 1m',
        description:
          'O guarda-corpo é peça essencial para a segurança e proteção nos andaimes.',
        imageUrl: 'guarda-corpo.jpg',
        value: 25,
      },
      {
        name: 'Motor de Acionamento',
        description:
          'O motor de acionamento é usado em vibradores de imersão com isolação classe II.',
        imageUrl: 'motor-acionamento.jpg',
        value: 25,
      },
      {
        name: 'Cortadora de Piso',
        description:
          'A cortadora de piso é utilizada para realizar cortes com precisão (juntas de dilatação) em pisos.',
        imageUrl: 'cortadora-piso.jpg',
        value: 35,
      },
      {
        name: 'Acabadora de Piso',
        description:
          'Acabadora ou alisadora de concreto tem por finalidade conferir ao concreto, em processo de cura.',
        imageUrl: 'acabadora-piso.jpg',
        value: 37.5,
      },
      {
        name: 'Martelo demolidor leve 10 kg',
        description:
          'O martelo demolidor leve de 10 kg, também conhecido popularmente como martelete, é essencial em obras civis. O martelo demolidor leve é indicado para demolição de alvenaria, pequenas vigas e pilares de concreto, revestimento de pisos e concreto magro. Com o martelo de demolição leve é possível fazer pequenos reparos e obras com materiais que não tenham alta resistência.',
        imageUrl: 'martelo-demolidor.jpg',
        value: 55,
      },
      {
        name: 'Compactador de Solo',
        description:
          'Os compactadores de solo à percussão são utilizados para compactar solos granulares e mistos.',
        imageUrl: 'compactador-solo.jpg',
        value: 65,
      },
      {
        name: 'Guincho de Coluna 200kg',
        description:
          'O guincho de coluna de 200 kg é utilizado para melhorar e facilitar o transporte de materiais. Este guincho de coluna reduz custos e o tempo de elevação. Um produto que proporciona maior segurança e praticidade à sua obra.',
        imageUrl: 'guincho-coluna.jpg',
        value: 60,
      },
      {
        name: 'Guincho de Elevação',
        description:
          'O guincho elétrico é versátil, prático de usar e extremamente útil para a elevação de cargas, proporcionando agilidade e produtividade no canteiro de obras.',
        imageUrl: 'guincho-elevacao.jpg',
        value: 63,
      },
      {
        name: 'Talha Manual 1t',
        description:
          'A talha manual de 1 tonelada é um equipamento de fácil utilização e extremamente versátil.',
        imageUrl: 'talha-manual.jpg',
        value: 120,
      },
      {
        name: 'Container Desmontável',
        description:
          'O Container desmontável e modular organiza e soluciona o problema com o armazenamento de materiais.',
        imageUrl: 'container.jpg',
        value: 115,
      },
      {
        name: 'Empilhadeira',
        description:
          'A empilhadeira é um equipamento necessário para movimentar, carregar e elevar grandes cargas.',
        imageUrl: 'empilhadeira.jpg',
        value: 110,
      },
      {
        name: 'Transpalete',
        description:
          'O transpalete manual movimenta sua carga com leveza e precisão.',
        imageUrl: 'transpalete.jpg',
        value: 25,
      },
      {
        name: 'Bomba Submersa (Água Limpa)',
        description:
          'Esta bomba submersa é adequada para o bombeamento de água limpa, apresentando desempenho rápido.',
        imageUrl: 'bomba-submersa.jpg',
        value: 22.9,
      },
      {
        name: 'Tripé',
        description:
          'O tripé é indicado como uma base niveladora para escoras metálicas.',
        imageUrl: 'tripe.jpg',
        value: 20.9,
      },
      {
        name: 'Serra Mármore 7',
        description:
          'Serra mármore 7 indicada para corte em cerâmicas e pedras.',
        imageUrl: 'serra-marmore.jpg',
        value: 27.9,
      },
      {
        name: 'Projetor de Argamassa',
        description:
          'O projetor de argamassa é ideal para proporcionar agilidade, economia e produtividade.',
        imageUrl: 'projetor-argamassa.jpg',
        value: 37.9,
      },
      {
        name: 'Soprador Térmico',
        description:
          'O soprador térmico permite o controle da temperatura e do fluxo de ar.',
        imageUrl: 'soprador-termico.jpg',
        value: 32.9,
      },
      {
        name: 'Esmerilhadeira 7',
        description:
          'Esmerilhadeira 7 indicada para esmerilhar e também realizar corte em alvenaria e metal.',
        imageUrl: 'esmerilhadeira.jpg',
        value: 29.9,
      },
      {
        name: 'Lixadeira de Cinta',
        description:
          'Lixadeira de cinta utilizada para desbastes em grandes superfícies.',
        imageUrl: 'lixadeira.jpg',
        value: 24.9,
      },
      {
        name: 'Cortadora de Porcelanato TR',
        description:
          'A cortadora TR foi desenvolvida para corte úmido de uma grande variedade de pisos.',
        imageUrl: 'cortadora-porcelanato.jpg',
        value: 34.9,
      },
      {
        name: 'Cortador Manual',
        description:
          'Cortador manual indicado para cortar pisos cerâmicos e porcelanatos com até 10 mm de espessura.',
        imageUrl: 'cortador-manual.jpg',
        value: 19.9,
      },
      {
        name: 'Serra Elétrica',
        description:
          'É um equipamento desenvolvido para realizar serviços como: aparar cercas vivas "eras", sebes, etc.',
        imageUrl: 'serra-eletrica.jpg',
        value: 44.9,
      },
      {
        name: 'Aluguel de Kit EPI',
        description:
          'Kit EPI(equipamentos de proteção individual) são essenciais para operar os equipamentos de segurança',
        imageUrl: 'kit-epi.jpg',
        value: 14.9,
      },
    ];
    await Promise.all(
      defaultProds.map((prod) =>
        this.repository.save(this.repository.create(prod)),
      ),
    );
  }
}
