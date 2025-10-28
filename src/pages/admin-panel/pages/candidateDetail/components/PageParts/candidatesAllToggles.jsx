// components/PageParts/CandidatesAllToggles.jsx
import { Accordion } from "@/ui/accordion";
import { AccordionSection } from "../helpers/accordionSection";

import {
  DetallesPersonales,
  InformacionFamiliar,
  InformacionAcademica,
  InformacionLaboral,
  ReferenciasPersonales,
  DatosGenerales,
  DatosEconomicos,
  Tallas,
  CVViewer,
} from "../toggles";

export function CandidatesAllToggles({
  openSections,
  setOpenSections,
  cv,
  detalles,
  familiar,
  academica,
  laboral,
  referencias,
  generales,
  economicos,
  tallas,
  retrySection,
  candidatoNombre,
  candidatoCargo,
}) {
  return (
    <Accordion
      type="multiple"
      className="space-y-4"
      value={openSections}
      onValueChange={setOpenSections}
    >
      {/* Sección de Hoja de Vida - LOTE 1 */}
      <AccordionSection
        value="hoja-de-vida"
        title="Hoja de Vida"
        isLoading={cv.isLoading}
        hasError={!!cv.error}
        onRetry={() => retrySection("cv")}
      >
        <CVViewer
          pdfUrl={cv.pdfUrl}
          isLoading={cv.isLoading}
          error={cv.error}
          candidatoNombre={candidatoNombre}
          candidatoCargo={candidatoCargo}
        />
      </AccordionSection>

      <AccordionSection
        value="detalles-personales"
        title="Detalles Personales"
        isLoading={detalles.isLoading}
        hasError={!!detalles.error}
        onRetry={() => retrySection("detalles_personales")}
      >
        <DetallesPersonales detalles={detalles.data?.detalles_personales} />
      </AccordionSection>

      <AccordionSection
        value="informacion-familiar"
        title="Información Familiar"
        isLoading={familiar.isLoading}
        hasError={!!familiar.error}
        onRetry={() => retrySection("informacion_familiar")}
      >
        <InformacionFamiliar
          informacion={familiar.data?.informacion_familiar}
        />
      </AccordionSection>

      <AccordionSection
        value="informacion-academica"
        title="Información Académica"
        isLoading={academica.isLoading}
        hasError={!!academica.error}
        onRetry={() => retrySection("informacion_academica")}
      >
        <InformacionAcademica
          informacion={academica.data?.informacion_academica}
        />
      </AccordionSection>

      <AccordionSection
        value="informacion-laboral"
        title="Información Laboral"
        isLoading={laboral.isLoading}
        hasError={!!laboral.error}
        onRetry={() => retrySection("informacion_laboral")}
      >
        <InformacionLaboral informacion={laboral.data?.informacion_laboral} />
      </AccordionSection>

      <AccordionSection
        value="referencias-personales"
        title="Referencias Personales"
        isLoading={referencias.isLoading}
        hasError={!!referencias.error}
        onRetry={() => retrySection("referencias_personales")}
      >
        <ReferenciasPersonales
          referencias={referencias.data?.referencias_personales}
        />
      </AccordionSection>

      <AccordionSection
        value="datos-generales"
        title="Datos Generales"
        isLoading={generales.isLoading}
        hasError={!!generales.error}
        onRetry={() => retrySection("datos_generales")}
      >
        <DatosGenerales datos={generales.data?.datos_generales} />
      </AccordionSection>

      <AccordionSection
        value="datos-economicos"
        title="Datos Económicos"
        isLoading={economicos.isLoading}
        hasError={!!economicos.error}
        onRetry={() => retrySection("datos_economicos")}
      >
        <DatosEconomicos datos={economicos.data?.datos_economicos} />
      </AccordionSection>

      <AccordionSection
        value="tallas"
        title="Tallas"
        isLoading={tallas.isLoading}
        hasError={!!tallas.error}
        onRetry={() => retrySection("tallas")}
      >
        <Tallas tallas={tallas.data?.tallas} />
      </AccordionSection>
    </Accordion>
  );
}
