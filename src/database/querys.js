export const querys = {
    getAllCampanas: "SELECT TOP(500) * FROM [AsilosAncianos].[dbo].[Campana]",
    getCampanaById: "SELECT * FROM Campana Where id = @Id",
    addNewProduct:
      "INSERT INTO [webstore].[dbo].[Products] (name, description, quantity) VALUES (@name,@description,@quantity);",
    deleteCampana: "DELETE FROM [AsilosAncianos].[dbo].[Campana] WHERE Id= @Id",

    updateCampanaById:
      "UPDATE [AsilosAncianos].[dbo].[Campana] SET nombre = @nombre, requerimiento = @requerimiento, fechaInicio = @fechaInicio , fechaCierre = @fechaCierre ,tipoCampaña = @tipoCampaña , establecimientoID = @establecimientoID, estado = @estado WHERE Id = @id",
  };