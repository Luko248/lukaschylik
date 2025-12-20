import { component$ } from '@builder.io/qwik'
import { Button } from '~/components'
import Container from '~/components/container/container'
import Reference from '~/components/reference/reference'
import Section from '~/components/section/section'
import SectionTitle from '~/components/section/section.title'

const References = component$(() => {
  return (
    <Section id="references" centerContent={false} fullHeight={false}>
      <Container size="full">
        <div class="relative grid gap-5 isolate">
          <div>
            <SectionTitle text="Referencie" />
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-[34fr_21fr] gap-5 items-start">
            <div class="mb-8 xl:mb-0">
              <div>
                <p class="text-sm lg:text-base 3xl:text-lg leading-relaxed font-light mb-4 md:mb-8 text-gray-800 dark:text-gray-300 font-mono">
                  Od roku 2016 som sa venoval tvorbe webových stránok pre
                  klientov ako Elendris alebo Anew Style.
                </p>
                <p class="text-sm lg:text-base 3xl:text-lg leading-relaxed font-light mb-4 md:mb-8 text-gray-800 dark:text-gray-300 font-mono">
                  V spolupráci so spoločnosťou Riganti som sa podieľal na
                  realizácii viacerých webových projektov. Pre Update Conference
                  som pripravil viacero webových stránok a prispel k vývoju UI
                  kitu pre framework DotVVM.
                </p>

                <p class="text-sm lg:text-base 3xl:text-lg leading-relaxed font-light mb-8 md:mb-16 text-gray-800 dark:text-gray-300 font-mono">
                  Okrem vývoja sa venujem aj prednášaniu na rôznych meetupoch a
                  konferenciách. Zároveň sa podieľam na spoluorganizácii
                  meetupov pod záštitou spolku&nbsp;
                  <a
                    class="underline"
                    href="https://www.frontendisti.cz/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Frontendisti
                  </a>
                  .
                </p>
                <Button
                  variant="secondary"
                  ariaLabel="Služby a spoupráca"
                  title="Služby a spoupráca"
                  href="#services">
                  Služby a spoupráca
                </Button>
                <div
                  class="video-carousel relative
                    grid grid-flow-col [grid-auto-columns:calc(100%-2rem)] gap-2 md:gap-4
                    mt-10 md:mt-20 max-w-full md:max-w-[560px]
                    overflow-x-auto overscroll-x-contain scroll-smooth
                    snap-x snap-mandatory [scroll-padding-inline:1rem]
                    [scrollbar-width:none] [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden
                    [&>*]:min-w-0 [&>*]:snap-center [&>*]:snap-always">
                  <iframe
                    class="w-full aspect-video block rounded-lg overflow-clip border-2 border-black dark:border-white"
                    loading="lazy"
                    width="560"
                    src="https://www.youtube.com/embed/eTjXcx5DUqM?si=P3ea1dfnwKqxrzyC"
                    title="YouTube video Lukáš Chylík - CSS scroll-state container queries"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullscreen></iframe>
                  <iframe
                    class="w-full aspect-video block rounded-lg overflow-clip border-2 border-black dark:border-white"
                    loading="lazy"
                    width="560"
                    src="https://www.youtube.com/embed/ITDfqStMym0?si=sWTLYIfZVc-OusDf"
                    title="YouTube video Lukáš Chylík - CSS scroll driven animations"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullscreen></iframe>
                  <iframe
                    class="w-full aspect-video block rounded-lg overflow-clip border-2 border-black dark:border-white"
                    loading="lazy"
                    width="560"
                    src="https://www.youtube.com/embed/hwhuSdO5fU0?si=ZckQ-cJlCGZpJExv"
                    title="YouTube video Lukáš Chylík - Frontendové novinky Máj 2025"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullscreen></iframe>
                  <iframe
                    class="w-full aspect-video block rounded-lg overflow-clip border-2 border-black dark:border-white"
                    loading="lazy"
                    width="560"
                    src="https://www.youtube.com/embed/p8sQyt4YFdk?si=WDxTC4029EeFecKk"
                    title="YouTube video Lukáš Chylík - CSS anchor positioning"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullscreen></iframe>
                </div>
              </div>
            </div>
            <ul class="ref-list list-none p-0 m-0 min-w-0">
              <Reference
                title="Vertice"
                webURL="https://vertice.one/"
                website="vertice.one"
                type="Design System"
              />
              <Reference
                title="VIGo"
                webURL="https://vig.cz/"
                website="vig.cz"
                type="Design System"
              />
              <Reference
                title="Riganti"
                webURL="https://www.riganti.cz/"
                website="riganti.cz"
                type="Spolupráca"
              />
              <Reference
                title="Update Conference"
                webURL="https://www.updateconference.net/"
                website="updateconference.net"
                type="Spolupráca"
              />
              <Reference
                title="Update Days"
                webURL="https://www.updatedays.cz/"
                website="updatedays.cz"
                type="Spolupráca"
              />
              <Reference
                title="Meetupdate"
                webURL="https://www.meetupdate.cz/"
                website="meetupdate.cz"
                type="Spolupráca"
              />
              <Reference
                title="DotVVM"
                webURL="https://www.dotvvm.com/"
                website="dotvvm.com"
                type="Spolupráca"
              />
              <Reference
                title="Brand DESIGN"
                webURL="https://brand-design.cz/"
                website="brand-design.cz"
                type="Web"
              />
              <Reference
                title="Elendris"
                webURL="https://elendris.cz/"
                website="elendris.cz"
                type="Web"
              />
              <Reference
                title="Anew style"
                webURL="https://anewstyle.cz/"
                website="anewstyle.cz"
                type="Web"
              />
              <Reference
                title="thelucie.ink"
                webURL="https://thelucie.ink/"
                website="thelucie.ink"
                type="Web"
              />
              {/* <Reference
              title="Krossbau s.r.o."
              webURL="https://www.krossbau.cz/"
              website="krossbau.cz"
              type="Web"
            />
            <Reference
              title="IVPA Okná"
              webURL="https://ivpaokna.sk/"
              website="ivpaokna.sk"
              type="Web"
            />
            <Reference
              title="Brand Design"
              webURL="https://brand-design.cz/"
              website="brand-design.cz"
              type="Web"
            />
            <Reference
              title="Filtre na mlieko"
              webURL="https://filtrenamlieko.sk/"
              website="filtrenamlieko.sk"
              type="Web"
            />
            <Reference
              title="IVPA bau"
              webURL="https://ivpabau.de/"
              website="ivpabau.de"
              type="Web"
            /> 
            */}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
})

export default References
