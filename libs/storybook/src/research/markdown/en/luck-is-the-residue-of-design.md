# Luck is the residue of design

Luck is the residue of design and is governed by causes which are generally in
the power of ourselves to govern.

Just like in the tensions between looking and leaping, exploring and exploiting,
one of the most central tradeoffs in computer science is between sorting and
searching. The basic principle is sorting materials as a strike against the
effort of searching through them later. Thinking about the sorting as valuable
only to support future tells us something surprising:

Sorting something that you will never search is a complete waste; searching
something you never sorted is merely inefficient.

For instance, on search engines the information sorting is done ahead of time
before results are available, and searching is done by users for whom time is of
the essence. All of these factors point in favor of tremendous up-front sorting,
which is indeed what search engines do.

Information processing began in the US censuses of the nineteenth century, with
the development, by Herman Hollerith and later IBM, of physical punch-card
sorting devices. In 1936, IBM began producing a line of machines called
“collators” that could merge two separately ordered stacks of cards into one. As
long as two stacks were themselves sorted, the procedure of merging them into a
single sorted stack was incredibly straightforward: simply compare two top cards
to each other, move the smaller of them to the new stack you’re creating, and
repeat until finished.

In fact, in many ways it was sorting that brought the computer into being.
Computer science gives us a way to understand what’s going on behind the scenes
in all of these cases, which in turn can offer us some insight for those times
when we are the one stuck with organizing bills, papers, books, socks and
probably more times each day than we realize. By quantifying the vice (and the
virtue) of the world around us, it also shows us the cases where it actually
doesn’t make sense to create an order at all. 

In reaction to massive economic turmoil, President Franklin D. Roosevelt
developed the idea of a Social Security Administration (SSA), a safety net to
help those lacking financial protection — senior citizens, people with
disabilities, the unemployed, and widows and orphans. When he signed the
legislation in August 1935, the document was scant on administrative details.
The challenge of creating and managing more than 27 million individual accounts
had yet to be addressed. It was a Herculean task. The system would need to
collect a massive amount of salary data, calculate payments and transmit the
information to the US Treasury Department, which would cut checks for qualified
recipients. The largest bookkeeping job in history at the time also faced a
daunting timeline. The law dictated that it be in place by January 1, 1937.

Not long before all this, in the early years of the Depression, IBM President
Thomas J. Watson Sr. made a risky bet. Based on his firm belief that the SSA
bill would eventually pass, he envisioned a tremendous business opportunity for
any company that could meet the increased need for data management in an
expanded government.

Once Congress formally approved the Social Security program, the government
chose IBM from among many bidders, buying all the machines in storage and
ordering many more. The IBM 405 Accounting Machine and the 077 Collator proved
to be the most advanced calculator available at the time, the first to process
information alphanumerically, translating binary information into letters by
recognizing specific patterns of ones and zeros. When unveiled in 1934,
tabulating 150 cards per minute, the 405 was the cutting edge of data
processing.

The program that John von Neumann wrote in 1945 to demonstrate the power of the
stored-program computer took the idea of collating to its ultimate. Sorting two
cards is simple: just put the smaller one on top. And given a pair of two-card
stacks, both of them sorted, you can easily collate them into an ordered stack
of four. Repeating this trick a few times, you’d build bigger stacks, each one
of them already sorted. Soon enough, you could collate yourself a perfectly
sorted full deck.

When it is time to get organized, you’re having two options. First, you need to
decide what to keep, and then how to arrange it. The fundamental insight- that
in-demand files should be stored near the location where they’re used- also
translates into purely physical environments. For example, Amazon’s enormous
fulfillment centers generally eschew any type of human-comprehensible
organization. Their patent is for shipping items that have been recently popular
in a given region to a staging warehouse in that region- like having their own
CDN for physical goods.

We’re told our data is “in the cloud,” which is meant to suggest a diffuse,
distant place. Again, none of these are true. The reality is that the Internet
is all about bundles of physical wires and racks of metal. And it’s much more
closely tied to geography than you might expect.

If you can create a cache of webpage content that is physically, geographically
closer to the people who want it, you can serve those pages faster. Much of the
traffic on the internet is now handled by “content distribution networks”
(CDNs), which have computers around the world that maintain copies of popular
websites. It allows users requesting those pages to get their data from a
computer that’s nearby, without having to make a long haul across continents to
the original server.

Much of your time using a modern browser is spent on the digital equivalent of
shuffling papers. This shuffling is also mirrored exactly on the Windows and Mac
OS task switching interfaces listing your applications in the order from the
most recently to the last recently used.

The caching on the browser active tabs works similarly. First, when deciding
what to keep and what to throw away, Last Recently Used (LRU) is the most common
principle. LRU is what scientists call “temporal locality”: if a program has
called for a particular piece of information once, it’s likely to do so again in
the near future. This results in part from the way computers solve problems
(e.g. executing a loop that makes rapid series of read and writes), but it
emerges in the way people solve problems, too.

The direct parallel between finding a best algorithm that would look ahead and
execute optimal policy is the “clairvoyance”-  is that there is a potential to
consciously apply the solutions to your biggest problems when acknowledging the
science behind it. Usually there are cases when a system knows what to expect
when you get as close as you intuitively can.

For instance, LRU teaches us that the next thing we can expect is the last one
we need, while the thing we’ll need after that is the second-most-recent one.
Yesterday I created a report of the Continuous Integration and delivery metrics,
and while searching for the time engineers spend on waiting for each deployment
workflow on a daily basis, I found that the system built as well organized and
comprehensive isn’t always stable and cost or time efficient.

Engineers from large enterprise organizations often share their impressions
about the workflows running for longer than 1 hour. It has different stages for
code formatting and testing, code and infrastructure compliance, application
build and deployments, and connection with the other integrations- have more
sophisticated architecture overall. At the same time the longer pipeline
duration and failure rate results in higher costs for the application and code
storage, e.g. when the test environments have separated build jobs running
autonomously, but if one of them fails on the pipeline then deployment stops and
most of the resources created for this workflow generate waste. Calculating that
a single failure on the system takes more than 1 hour to sort the code,
categorize it for the bucket sort, and then for the human resources to
troubleshoot it, find a solution, and wait another hour for the next round
review.

A final insight, which hasn’t yet made it into guides on closet organization, is
that of the multi-level memory hierarchy. Having a cache is efficient, but
having multiple levels of caches- from smallest and fastest to largest and
slowest- can be for better, or worse. If you can use LRU principle as the basis
for deciding what gets evicted from each level to the next, you might as well
speed things up by adding yet another level of caching.

If you’re starting with sorting your clothes, computer scientists revealed a
solution to this problem too. Rik Belew of UC San Diego, who studies search
engines from a cognitive perspective, recommended the use of a valet stand.
Though you don’t see too many of them these days, a valet stand is essentially a
one-outfit closet, a compound hanger for jacket, tie, and slacks- the perfect
piece of hardware for your domestic caching needs.

Imagine you have a set of items in a sequence, and you must periodically search
through them to find specific items. The search itself is constrained to be
linear- you must look through the items one by one, starting at the beginning-
but once you find the item you’re looking for, you can put it back anywhere in
the sequence. Where should you replace the items to make searching as efficient
as possible?

Intuitively, since the search starts at the front, you want to arrange the
sequence so that items are searched to appear there. But which items will it be?
We’re back to clairvoyance again. 

If you know the sequence ahead of time, you can customize the data structure to
minimize the total time for the entire sequence. That’s the optimum offline
algorithm, and of course no one knows the future, so how close can you come to
this optimum algorithm?

I couldn’t imagine a better example than my love partner sorting the best
outfits in a shopping tour out of a vast market of options- he epitomizes the
selection of meticulously tailored, personalized clothing suited exclusively for
occasion, for me, himself and our friends in no time.

We humans sort more than our data, more than our possessions. We sort ourselves,
and that is the biggest Herculean task**.**

In photo: Kimonos from Aura Berlin, modelling- Max, Pablo and me.
