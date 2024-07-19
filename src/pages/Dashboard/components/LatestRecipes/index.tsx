import { useEffect, useState } from "react";
import { Checkbox, CheckboxContainer, Container, Filters, Title, TitleContainer } from "./styles";
import api from "../../../../axios/axiosConfig";

export function LatestRecipes() {
    const [selectedFilter, setSelectedFilter] = useState<string>("Todas");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };
  
  const [users, setUsers] = useState(0)
  useEffect(() => {
    async function fetchData(){
      const resultado = await api.get("/api/labfoods/v1/dashboard/users/active")
      console.log(resultado.data)
      setUsers(resultado.data)
    }
    fetchData()
  }, [])

    return (
      <Container>
        <TitleContainer>
          <div>
            <Title>Últimas Receitas</Title>
            <p>Usuários Ativos: {users}</p>
          </div>
          <Filters>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={selectedFilter === "Todas"}
                onChange={() => handleFilterChange("Todas")}
              />
              Todas as Receitas
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={selectedFilter === "Sem Glúten"}
                onChange={() => handleFilterChange("Sem Glúten")}
              />
              Sem Glúten
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={selectedFilter === "Sem Lactose"}
                onChange={() => handleFilterChange("Sem Lactose")}
              />
              Sem Lactose
            </CheckboxContainer>
          </Filters>
        </TitleContainer>
      </Container>
    );
  }
  