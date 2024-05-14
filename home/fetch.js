export const fetchRequest = async ({
    url,  //endpoint
    key,  //token di autenticazione per l'endpoint
    method,  //GET, POST, PUT, DELETE
    data = "",
    id = "", //usato con API REST per specificare ID
  }) => {
    try {
      const requestOptions = {
        method: method,
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      };
  
  
      if (data !== "") {  //se data non è vuoto allora convertilo in JSON
        requestOptions.body = JSON.stringify(data);
      }
  
  
      const resp = await fetch(url + id, requestOptions); // esegui funzione fetch
      const json = await resp.json();  //si aspetta la risposta e si converte in JSON
      return json;
    } catch (error) {  //per eventuali errori
      alert(`error: ${error}`);
    }
};