export const dashboardService = {

  async getDashboard(){
  
    const res = await fetch( "/api/dashboard");
    
    if(!res.ok){
      throw new Error( "Failed loading dashboard");
    }
    
    return res.json();
  
  }
  
}