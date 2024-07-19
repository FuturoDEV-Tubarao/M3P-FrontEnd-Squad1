import { Recipes } from "../Recipes";
import { Container, Grid } from "./styles";

export function Cards() {
  return (
    <div>
      <Container>
        <Grid>
          <Recipes />
        </Grid>
      </Container>
    </div>
  );
}
