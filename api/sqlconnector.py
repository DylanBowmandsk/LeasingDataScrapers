import pyodbc 


def initialiseDB():
    # Some other example server values are
    # server = 'localhost\sqlexpress' # for a named instance
    # server = 'myserver,port' # to specify an alternate port
    server = 'pvl-analytics.database.windows.net' 
    database = 'autolytica' 
    username = 'analytics' 
    password = 'Supp0rt1' 
    cnxn = pyodbc.connect('DRIVER=SQL Server;SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    return cnxn