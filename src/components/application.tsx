import { useEffect, useState } from 'react';
import Quotes from './quotes';
import InspirationalQuote from './quote';
import Loading from './loading';

export type Quote = {
  id: number;
  content: string;
  source?: string;
};

export const fetchRandomQuote = async () => {
  const response = await fetch(`/api/quotes/random`);
  return response.json();
};

export const fetchQuotes = async (count: number) => {
  const response = await fetch(`/api/quotes?limit=${count}`);
  return response.json();
};

const Application = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [count, setCount] = useState(10);

  // don't need this as there is a button to load the quotes with multi quotes form
  // useEffect(() => {
  //   fetchRandomQuote().then(setQuote);
  // }, []);

  if (!quotes) return <Loading />;
  return (
    <main className="mx-auto w-full max-w-2xl py-16">
      {/* <InspirationalQuote content={quote.content} source={quote.source} /> */}
      <Quotes
        onChange={(e) => setCount(+e.target.value)}
        count={count}
        onSubmit={() => fetchQuotes(count).then(setQuotes)}
      >
        <div className="grid grid-cols-2 gap-4"></div>
        {quotes.map((quote) => {
          return (
            <InspirationalQuote
              key={quote.id}
              content={quote.content}
              source={quote.source}
            />
          );
        })}
      </Quotes>
    </main>
  );
};

export default Application;
