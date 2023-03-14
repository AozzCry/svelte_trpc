<script script lang="ts">
  import Button, { Label } from "@smui/button";
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import Textfield from "@smui/textfield";

  let promise = getUsers();

  import { trpc } from "../lib/trpc/client";
  async function getUser(id: number) {
    return await trpc.userById.query(id);
  }
  async function getUsers() {
    return await trpc.userAll.query();
  }
  async function deleteUser(id: number) {
    promise = trpc.userDeleteById.query(id);
  }
  async function creatUser(name: string) {
    promise = trpc.userCreate.mutate({ name });
  }

  let value: string = "";
</script>

<Textfield type="email" bind:value label="Name" />
<Button on:click={() => creatUser(value)} variant="raised">
  <Label>Create</Label>
</Button>

<DataTable style="width: 100%;">
  <Head>
    <Row>
      <Cell numeric>ID</Cell>
      <Cell>Name</Cell>
      <Cell>Actions</Cell>
    </Row>
  </Head>
  <Body>
    {#await promise then users}
      {#each users as user (user.id)}
        <Row>
          <Cell numeric>{user.id}</Cell>
          <Cell>{user.name}</Cell>
          <Cell>
            <Button on:click={() => deleteUser(user.id)} variant="raised">
              <Label>Delete</Label>
            </Button>
          </Cell>
        </Row>
      {/each}
    {/await}
  </Body>
</DataTable>
