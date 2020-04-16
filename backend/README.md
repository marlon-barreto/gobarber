<img alt="GoStack" src="https://camo.githubusercontent.com/d25397e9df01fe7882dcc1cbc96bdf052ffd7d0c/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f676f6c64656e2d77696e642f626f6f7463616d702d676f737461636b2f6865616465722d6465736166696f732e706e67" />

<h3 align="center">
  Projeto Gobarber
</h3>

### Funcionalidades da aplicação

**`POST /transactions`**:

**`GET /transactions`**:

### Como utilizar

Install the dependencies

```sh
$ yarn install -d
$ yarn dev:server
$ yarn test
$ yarn typeorm
```

### Como utilizar typeorm

**`Criar migration CreateAppointments`**:
 yarn typeorm migration:create -n CreateAppointments
 yarn typeorm migration:create -n CreateUsers

**`Executar uma migration no banco `**:
 yarn typeorm migration:run

 **`Voltar uma migration `**:
 yarn typeorm migration:revert

 **`Mostar todas as migrations executada `**:
 yarn typeorm migration:show


1)Migritions
2)models

