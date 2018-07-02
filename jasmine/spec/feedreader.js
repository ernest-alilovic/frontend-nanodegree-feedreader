/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // RSS feed test suite
    describe('RSS Feeds', function() {
        // Ensures all feeds are defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Ensures all feeds are URL-friendly
         it('has URL defined and they are not empty', function() {
             allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
              });
          });

        // Ensures all feed have names and are not empty
         it('has name defined and they are not empty', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
         });
    });


    // Test suite for menu
    describe('The menu', function() {
        // Ensures menu element is hidden by default
         it('is hidden', function() {
             expect($('body').hasClass('menu-hidden')).toBe(true);
             // ref: https://api.jquery.com/hasclass/
         });
         // Ensures menu changes visibility when clicked
          it('toggles visibility on click', function() {
             $('a.menu-icon-link').trigger('click'); // shows menu
             expect($('body').hasClass('menu-hidden')).toBe(false);
             $('a.menu-icon-link').trigger('click'); // hides menu again
             expect($('body').hasClass('menu-hidden')).toBe(true);
          });
     });
    // Inital Entries test suite
    describe('Initial Entries', function() {
        // Ensures there is at least a single .entry element within
        // the .feed container when the loadFeed function is called
         beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    // New Feed Selection test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
      var oldFeed;

        // Ensures when new feed is loaded by the loadFeed function,
        // the content actually changes.
         beforeEach(function(done) {
            loadFeed(0, function() {
                // stores old feed
                oldFeed = $('.feed').html();
                // fetches newer feed
                loadFeed(1, done);
            });
        });

        it('is different from old', function() {
            expect($('.feed').html()).not.toBe(oldFeed);
        });
    });

}());
