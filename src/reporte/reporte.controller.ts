import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReporteDto } from './reporte.dto';
import { ReporteEntity } from './reporte.entity/reporte.entity';
import { ReporteService } from './reporte.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import * as multer from 'multer';
import { Express } from 'express';

@Controller('reportes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReporteController {
    constructor(
        private readonly reporteService: ReporteService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        const reportes = await this.reporteService.findAll();
        return reportes.map(reporte => ({ id: reporte.id, titulo: reporte.titulo }));
    }

    @UseGuards(JwtAuthGuard)
    @Get('titulo/:reporteId')
    async findTitle(@Param('reporteId') reporteId: string) {
        const reporte = await this.reporteService.findOne(reporteId);
        return { id: reporte.id, titulo: reporte.titulo };
    }

    @UseGuards(JwtAuthGuard)
    @Get('pdf/:reporteId')
    async findPDF(@Param('reporteId') reporteId: string, @Res() res: Response) {
        const reporte = await this.reporteService.findOne(reporteId);
        if (!reporte) {
            res.status(404).json({ message: 'Reporte no encontrado' });
            return;
        }
        res.sendFile(join(process.cwd(), reporte.archivo));
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            }
        })
    }))
    async create(@UploadedFile() file: Express.Multer.File, @Body() reporteDto: ReporteDto) {
        const reporte = plainToInstance(ReporteEntity, reporteDto);
        reporte.archivo = file.path;
        return await this.reporteService.create(reporte);
    }

}
