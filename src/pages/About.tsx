import Layout from '@/components/layouts/Layout';
import { Users, Target, Heart, BookOpen } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: 'Grazziano B. Fagundes',
      role: 'Criador & Desenvolvedor Principal',
      description:
        'Pesquisador e desenvolvedor com mais de 10 anos de experiência em engenharia de software, atualmente focado em arquitetura de dados, Social IoT e visualização de relações entre objetos inteligentes. Autor da proposta VISO-BASS, integra tecnologia, ciência e design para criar ferramentas úteis para pesquisa e desenvolvimento.',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Inovação',
      description:
        'Aplicamos conceitos modernos para transformar modelos complexos em soluções tecnológicas acessíveis e eficientes.',
    },
    {
      icon: Heart,
      title: 'Compromisso',
      description:
        'Prezamos pela precisão, qualidade e responsabilidade em cada etapa do desenvolvimento, sempre alinhados à pesquisa científica.',
    },
    {
      icon: BookOpen,
      title: 'Educação',
      description:
        'Promovemos o aprendizado contínuo, incentivando a exploração de conhecimento e o avanço da Social IoT.',
    },
    {
      icon: Users,
      title: 'Colaboração',
      description:
        'Valorizamos o trabalho coletivo, acreditando que a troca de ideias fortalece pesquisas, tecnologias e comunidades.',
    },
  ];

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">Sobre Nós</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A VISO-BASS é uma aplicação desenvolvida para apoiar pesquisas e
            soluções baseadas na Social IoT, utilizando como base o modelo
            estrutural VISO (Visualization of Social Objects). Seu objetivo é
            oferecer uma forma simples, visual e eficiente de representar
            objetos, classes, interações e relações sociais presentes em
            ambientes inteligentes e conectados.
            <br />
            <br />A plataforma permite explorar a estrutura da Social IoT por
            meio de uma interface intuitiva, onde cada elemento do ecossistema
            pode ser visualizado, analisado e compreendido de maneira clara. Com
            isso, pesquisadores, desenvolvedores e profissionais da área podem
            observar como entidades se relacionam, como se comportam e como
            influenciam umas às outras dentro de um ambiente conectado.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Nossa Missão</h2>
            <p className="text-muted-foreground leading-relaxed">
              Desenvolver ferramentas tecnológicas que facilitem o entendimento,
              representação e análise da Social IoT, tornando acessível a
              visualização de relações entre objetos, classes e ambientes
              conectados. Nossa missão é capacitar pesquisadores e profissionais
              a compreenderem sistemas complexos por meio de interfaces claras,
              interativas e fundamentadas em modelos consolidados, como o VISO.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Nossa Visão</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ser referência em soluções voltadas à análise estrutural e
              visualização da Social IoT, contribuindo para pesquisas,
              aplicações práticas e avanços na forma como sistemas inteligentes
              são projetados e compreendidos. Buscamos criar um ecossistema onde
              dado, ciência e tecnologia convergem para gerar conhecimento e
              inovação de forma aberta e colaborativa.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <IconComponent className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Nossa Equipe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors space-y-3"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-primary font-medium">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">
            Quer Fazer Parte de Nossa Jornada?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Estamos sempre à procura de talentos apaixonados que compartilham
            nossa visão e valores.
          </p>
          <button className="mt-4 px-8 py-2 bg-blue-500 text-primary-foreground rounded-lg hover:bg-blue-600/90 transition-colors">
            Entre em Contato
          </button>
        </section> */}
      </div>
    </Layout>
  );
}
