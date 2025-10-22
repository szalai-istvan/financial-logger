import type { Request, Response } from "express";
import path from "path";

export function downloadScript(req: Request, res: Response) {
    console.log('downloadScript');

    const subdirectory = req.params.subdirectory || '';
    const filename = req.params.filename || '';

        if (!subdirectory || !filename) {
            res
            .status(400)
            .json({error: `missing or invalid parameter, subdirectory=${subdirectory}, filename=${filename}`});
        }
   
        console.log(subdirectory);
        console.log(filename);
        res.sendFile(path.resolve(process.cwd(), 'templates', subdirectory, 'js', filename));
}