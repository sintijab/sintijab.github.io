import type { MiddlewareHandler } from 'astro'
import { sequence } from 'astro:middleware'
import cspBuilder from 'content-security-policy-builder'
import { parse } from 'node-html-parser'
import crypto from 'crypto'

const setCspHeader: MiddlewareHandler<any> = async function setCspHeader(_, next) {
    const response = await next()
    if (response.headers.get('content-type') !== 'text/html') return response

    const originalHtml = await response.clone().text()
    const parsedHtml = parse(originalHtml)

    const newResponse = new Response(parsedHtml.outerHTML, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    })

    const scripts = parsedHtml.querySelectorAll('script:not([src])')
    const scriptHashes = scripts.map(script => createCspHash(script.textContent))
    const styles = parsedHtml.querySelectorAll('style')
    const styleHashes = styles.map(style => createCspHash(style.textContent))
    newResponse.headers.set('Content-Security-Policy', cspBuilder({
        directives: {
            defaultSrc: ['\'self\''],
            scriptSrc: [
                '\'self\'',
                'https://www.googletagmanager.com',
                'https://www.google.com',
                'https://s3.amazonaws.com',
                ...scriptHashes
            ],
            styleSrc: [
                '\'self\'',
                ...styleHashes
            ],
            fontSrc: [
                '\'self\'',
            ],
            imgSrc: [
                '\'self\'',
                'data:',
                'https://images.prismic.io'
            ],
            frameSrc: [
                'https://www.google.com'
            ],
            connectSrc: [
                '\'self\'',
                '*.google-analytics.com'
            ]
        }
    }))

    return newResponse
}

export const onRequest = sequence(setCspHeader)

function createCspHash(content: string): string {
    return `'sha256-${crypto.createHash('sha256').update(content).digest('base64')}'`
}