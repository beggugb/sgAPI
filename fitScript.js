var shell = require('shelljs');
export const files = () =>{
    console.log('samples')
    shell.rm('-rf', '/public/images/trash/*');
    
}
