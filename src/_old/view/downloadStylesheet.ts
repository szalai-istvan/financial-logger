import type { Request, Response } from "express";
import path from "path";

export function downloadStylesheet(req: Request, res: Response) {
    const subdirectory = req.params.subdirectory || '';
    const filename = req.params.filename || '';

        if (!subdirectory || !filename) {
            res
            .status(400)
            .json({error: `missing or invalid parameter, subdirectory=${subdirectory}, filename=${filename}`});
        }
   
        res.sendFile(path.resolve(process.cwd(), 'templates', subdirectory, 'css', filename));
}