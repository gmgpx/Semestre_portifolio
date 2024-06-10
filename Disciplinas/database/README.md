# Banco de dados - 1º Semestre ADS Senai
<br>
<h3>Proposta:
  
  <br>
  <br>

<sub>Você foi contratado para projetar o banco de dados relacional de um sistema educacional para uma universidade.
O sistema deve coletar as seguintes informações de cada aluno: 
- nome
- cpf
- idade
- endereço
- contato (email ou telefone, ou ambos).

  
<sub>Além disso o sistema deve gerar um RA (Registro de Aluno) para cada aluno.

<sub>Cada curso ofertado no sistema é associado a um departamento da instituição de ensino, que agrupa os cursos em áreas.

<sub>Áreas de atuação da universidade:
Saúde
Tecnologia
Engenharia
Humanas
Cada curso possui suas respectivas disciplinas, sendo algumas optativas. Algumas disciplinas podem pertencer a mais de um curso, como por exemplo Cálculo que é comum a todos os cursos de engenharia.

<sub>Este sistema permite que o aluno, após matriculado em um curso, monte sua própria grade, escolhendo as disciplinas disponíveis no semestre corrente do curso ao qual foi matriculado.

<sub>Cada aluno pode se matricular em mais de um curso.

<sub>A instituição deve manter os dados de seus alunos na plataforma mesmo após sua colação de grau.

<br>
</br>

<h3>Diagrama ER do projeto 01</h3>
<img width="472" alt="diagramaER" src="https://github.com/gmgpx/DataBase/assets/158373467/e2029f92-cceb-4008-a9fd-1bf2362a61a0">
<br></br>
<h2>DDL
  
```
--Criação de tabelas
CREATE TABLE alunos(
	cpf int PRIMARY KEY,
	nome varchar(50) not null,
	idade int,
	rua text,
	numero varchar(10),
	bairro varchar(20),
	cidade varchar(20),
	estado varchar(20),
	cep int,
	pais varchar(20)
)

ALTER TABLE alunos ALTER COLUMN cpf TYPE varchar(15)

SELECT * FROM alunos

CREATE TABLE departamentos(
	id_dep serial PRIMARY KEY,
	nome_dep varchar(20)
)

CREATE TABLE cursos(
	id_curso serial PRIMARY KEY,
	nome_curso varchar(40),
	id_dep serial REFERENCES departamentos
)

CREATE TABLE matriculas(
	ra serial PRIMARY KEY,
	cpf varchar(15) REFERENCES alunos,
	status varchar(10),
	id_curso int REFERENCES cursos
)

CREATE TABLE disciplinas(
	id_disc serial PRIMARY KEY,
	nome_disc varchar(40),
	optativa boolean
)

CREATE TABLE curso_disciplinas(
	id_curso serial REFERENCES cursos,
	id_disc serial REFERENCES disciplinas
)

CREATE TABLE matriculas_disciplinas(
	ra serial REFERENCES matriculas,
	id_disc serial REFERENCES disciplinas
)
```


<h2>DML

```
--Povoando alunos
INSERT INTO alunos (cpf, nome, idade, rua, numero, bairro, cidade, estado, cep, pais)
VALUES
    ('123.456.789-00', 'Gisele Bundchen', 25, 'Av. Brigadeiro Faria Lima', '1500', 'Jardim Paulistano', 'São Paulo', 'SP', 1451000, 'Brasil'),
    ('987.654.321-00', 'Ayrton Senna', 30, 'Av. Paulista', '2355', 'Bela Vista', 'São Paulo', 'SP', 1311300, 'Brasil'),
    ('111.222.333-44', 'Pelé', 22, 'Av. Brasil', '1200', 'Jardim América', 'Rio de Janeiro', 'RJ', 20040003, 'Brasil'),
    ('999.888.777-66', 'Cristiano Ronaldo', 35, 'Av. Atlântica', '1702', 'Copacabana', 'Rio de Janeiro', 'RJ', 22021001, 'Brasil'),
    ('222.333.444-55', 'Lionel Messi', 28, 'Calle Suipacha', '1140', 'Retiro', 'Buenos Aires', NULL, 1011, 'Argentina'),
    ('444.555.666-77', 'Tom Brady', 40, '1 Patriot Pl', NULL, 'Foxborough', 'Massachusetts', 'MA', 2035, 'Estados Unidos'),
    ('555.666.777-88', 'Serena Williams', 33, 'Palm Beach Island', NULL, 'Palm Beach', 'Flórida', 'FL', 33480, 'Estados Unidos'),
    ('666.777.888-99', 'Usain Bolt', 31, 'Sunset Boulevard', NULL, 'West Hollywood', 'California', 'CA', 90069, 'Estados Unidos'),
    ('777.888.999-00', 'Michael Jordan', 45, 'E Oak St', '875', 'Chicago', 'Illinois', 'IL', 60611, 'Estados Unidos');

--Povoando departamentos
INSERT INTO departamentos (nome_dep) VALUES
    ('Tecnologia'),
    ('Engenharia'),
    ('Medicina'),
    ('Humanas'),
    ('Economia');
	
-- Povoando cursos
INSERT INTO cursos (nome_curso, id_dep) VALUES
    ('Ciência da Computação', 1),  -- Tecnologia
    ('Engenharia Elétrica', 2),  -- Engenharia
    ('Medicina Geral', 3),  -- Medicina
    ('Filosofia', 4),  -- Humanas
    ('Economia', 5),  -- Economia
    ('Engenharia de Software', 1),  -- Tecnologia
    ('Engenharia Mecânica', 2),  -- Engenharia
    ('Pediatria', 3),  -- Medicina
    ('História', 4),  -- Humanas
    ('Contabilidade', 5);  -- Economia

-- Povoando matriculas
INSERT INTO matriculas (cpf, status, id_curso) VALUES
    ('123.456.789-00', 'cursando', 1),  -- Curso: Ciência da Computação
    ('987.654.321-00', 'formado', 2),  -- Curso: Engenharia Elétrica
    ('111.222.333-44', 'desistente', 3),  -- Curso: Medicina Geral
    ('999.888.777-66', 'cursando', 4),  -- Curso: Filosofia
    ('222.333.444-55', 'formado', 5),  -- Curso: Economia
    ('444.555.666-77', 'cursando', 6),  -- Curso: Engenharia de Software
    ('555.666.777-88', 'formado', 7),  -- Curso: Engenharia Mecânica
    ('666.777.888-99', 'cursando', 8),  -- Curso: Pediatria
    ('777.888.999-00', 'desistente', 9);  -- Curso: História

-- Povoando disciplinas
INSERT INTO disciplinas (nome_disc, optativa) VALUES
    ('Algoritmos', false),  -- Ciência da Computação (Tecnologia)
    ('Circuitos Elétricos', false),  -- Engenharia Elétrica (Engenharia)
    ('Anatomia', true),  -- Medicina Geral (Medicina)
    ('Ética', true),  -- Filosofia (Humanas)
    ('Macroeconomia', false),  -- Economia (Economia)
    ('Programação Orientada a Objetos', false),  -- Engenharia de Software (Tecnologia)
    ('Mecânica dos Fluidos', true),  -- Engenharia Mecânica (Engenharia)
    ('Pediatria Clínica', true),  -- Pediatria (Medicina)
    ('História Antiga', false),  -- História (Humanas)
    ('Contabilidade Gerencial', false);  -- Contabilidade (Economia)
```
<br>

_by Gustavo Monteiro_
