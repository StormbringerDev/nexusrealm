import { getCharacterById } from '@/app/actions/characters';
import { CharacterSheet } from '@/components/character-sheet';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = await getCharacterById(id);

  if (!character) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <h1 className="text-6xl text-red-500">Error 500: Internal Server Error</h1>
      </div>
    );
  }

  return <CharacterSheet character={character} />;
}
