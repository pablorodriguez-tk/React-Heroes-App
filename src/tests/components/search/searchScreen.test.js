import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import SearchScreen from "../../../components/search/SearchScreen";

describe("Pruebas en <SearchScreen/>", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/search"]}>
      <Route path="/search" component={SearchScreen} />
    </MemoryRouter>
  );

  test("Debe de mostrarse correctamente con valores por defecto", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("Debe de mostrar a Batman y el input con el valor del queryString", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de mostrar un error si no se encuentra el hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      "There is no a hero with batman123"
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de llamar el push del history", () => {
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper
      .find("input")
      .simulate("change", { target: { name: "searchText", value: "batman" } });

    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
    expect(history.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
