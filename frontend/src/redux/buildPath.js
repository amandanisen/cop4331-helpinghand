const app_name = 'helpinghand-cop4331';
module.exports = function buildPath(route)
{
        return 'https://' + app_name +  '.herokuapp.com' + route;
}