import fs from 'fs';

export const jsonToFile = (path: string, json: {}): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(json);
        fs.writeFile(path, json, 'utf-8', (err) => {
            resolve(!!err)
        });
    })
}