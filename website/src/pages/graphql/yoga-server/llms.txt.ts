import { getCollection } from 'astro:content';
import { getYogaDocsNav, getYogaTutorialNav } from '../../../yoga/lib/docs-nav';
import { getYogaLlmsText } from '../../../yoga/lib/llms';

export const prerender = true;

export async function GET() {
  const [docs, tutorial, docsNav, tutorialNav] = await Promise.all([
    getCollection('yogaDocs'),
    getCollection('yogaTutorial'),
    getYogaDocsNav(),
    getYogaTutorialNav(),
  ]);
  return new Response(
    getYogaLlmsText({ docs, docsNav: docsNav.tree, tutorial, tutorialNav: tutorialNav.tree }),
    { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
  );
}
