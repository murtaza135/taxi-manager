import { Title } from '@/features/title/components/Title';
import { Slide, SlideContent, SlideItem, SlideTabs, SlideTab, SlideSelect, SlideSelectItem } from '@/ui/Slide';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function RentPage() {
  const breakpoint = useBreakpoint('xs');

  return (
    <div>
      <Title title="Rent" />

      <Slide min={1} max={4}>
        {!breakpoint
          ? (
            <SlideSelect>
              <SlideSelectItem index={1}>Option 1</SlideSelectItem>
              <SlideSelectItem index={2}>Option 2</SlideSelectItem>
              <SlideSelectItem index={3}>Option 3</SlideSelectItem>
              <SlideSelectItem index={4}>Option 4</SlideSelectItem>
            </SlideSelect>
          )
          : (
            <SlideTabs>
              <SlideTab index={1}>Option 1</SlideTab>
              <SlideTab index={2}>Option 2</SlideTab>
              <SlideTab index={3}>Option 3</SlideTab>
              <SlideTab index={4}>Option 4</SlideTab>
            </SlideTabs>
          )}

        <SlideContent>
          <SlideItem index={1}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel iusto ut dolore exercitationem officia quibusdam voluptatem neque ipsa, quo natus vitae id quas corporis ex sequi esse! Iusto iure molestias animi eos sapiente reiciendis mollitia eveniet rem, voluptatem quod esse hic officiis maxime omnis asperiores quidem accusantium voluptate tenetur quo aut, obcaecati quia? Debitis qui odit ipsam exercitationem facilis voluptates veniam tempora iste corporis eveniet nemo quae, similique, adipisci pariatur dolore fugiat quo! Perspiciatis minima nobis velit laudantium nulla tenetur doloremque incidunt vel. Minima, recusandae quibusdam aliquam natus saepe provident repudiandae ea? Blanditiis minus beatae exercitationem repellendus nobis consequuntur voluptate est et quis animi adipisci alias, odio sequi, rerum ut corporis id cupiditate, obcaecati optio architecto officiis? Architecto, in voluptate. Cupiditate magni hic omnis, iure error quam recusandae earum natus? Aut sapiente odit optio. Maiores vero, sit, architecto distinctio esse maxime rem reiciendis, quod itaque in incidunt illum quo velit harum! Eaque facilis doloribus quam molestias provident rerum debitis. Quaerat unde provident accusantium mollitia recusandae quia magni saepe ratione totam eos fugit maiores, optio tempora earum quod odit, molestiae ducimus aperiam sequi dolorem placeat asperiores minima. Reprehenderit aperiam eos laudantium amet fugiat ipsa eaque iste cupiditate voluptatum harum odio delectus quas accusantium soluta voluptates dolores sapiente porro, voluptatibus distinctio vel. Labore autem porro magnam doloribus ab corporis tempore. Voluptas aspernatur fuga ducimus, eaque ipsa ullam earum omnis laborum a libero officia? Minus culpa omnis, exercitationem beatae eaque, voluptatibus quisquam assumenda labore illum distinctio a. Aliquid neque, nobis laborum quae dolorum reiciendis necessitatibus quos dignissimos! Laborum nulla sunt labore esse impedit quam voluptatibus ea! Qui nemo exercitationem nostrum ullam aliquid, aut, unde ipsum maiores consectetur rerum eum magni numquam fugiat optio omnis sint ad! Laborum fugiat adipisci neque illum aperiam accusamus sed ab corrupti exercitationem fugit quos vero amet vitae porro rerum reprehenderit, dolores ullam consequuntur incidunt, voluptatem voluptatum quisquam non in? Veniam nulla expedita eaque perferendis blanditiis aperiam, fugit possimus recusandae quas ab illo veritatis rem quis sed quasi ex maiores necessitatibus deleniti placeat tempora hic exercitationem nemo? Eveniet debitis sit consectetur molestiae labore magni explicabo, aut molestias eius, similique id voluptas officiis voluptate necessitatibus architecto minus praesentium quod unde. Perspiciatis laudantium, illum iste, esse nam tempore, est libero quisquam atque quia vero vitae ratione dolores magnam. Id placeat nobis qui error quaerat quasi, pariatur maxime molestias odio sint ducimus eius aliquam nam iste, cum esse dolor dolorum atque est porro commodi. Iure blanditiis quaerat deserunt tempora alias est suscipit sed deleniti molestias laudantium voluptas praesentium amet possimus nobis dolore tempore, soluta, similique voluptates excepturi voluptatum cupiditate libero, recusandae beatae! Hic cumque cupiditate libero esse temporibus ab consequatur illum ipsam delectus accusantium blanditiis omnis, culpa quibusdam praesentium vero error maiores laboriosam officia, id sint! Sit exercitationem cumque placeat delectus illo animi libero, corporis accusamus excepturi voluptatibus repudiandae mollitia aliquid ad id, dolorum qui ut ex porro fugiat. Cupiditate facilis nemo non rerum minima doloribus sed numquam tenetur eius deserunt. Quibusdam nisi modi, officiis delectus sunt eaque omnis molestiae, aliquid aperiam a soluta quis! Iusto consequuntur animi ipsam expedita! Veritatis nesciunt praesentium provident suscipit minus molestias blanditiis, distinctio error ad aut iure veniam iste vitae. Sint doloribus inventore dicta tenetur accusamus. Quas corporis nisi voluptatem reprehenderit tenetur? Perspiciatis amet magni dicta iure consectetur hic commodi impedit dolorem adipisci cumque. Consectetur quas id ipsam accusamus, velit a possimus vero ut ratione, labore qui quod recusandae cupiditate quam! Tempore reiciendis delectus perferendis quibusdam itaque vel pariatur eos nam consectetur, debitis repellendus quasi, ad a aliquam natus vitae distinctio quaerat consequatur nobis. Tempora exercitationem dignissimos aspernatur, est velit voluptates veniam, culpa, sit voluptate qui illo libero assumenda aut quas impedit esse debitis. Earum repudiandae necessitatibus dolor dolorem veniam. Earum non quasi deserunt maxime quas explicabo quae hic illo recusandae, eos qui repellendus ratione porro, eius asperiores, suscipit ex labore nulla accusantium harum atque reprehenderit consectetur cum. Tenetur iure impedit nisi cumque, placeat minus officiis repudiandae illum velit recusandae, libero dolor facere quia consequuntur odio animi atque commodi vero voluptatibus sed suscipit quisquam? At ipsam dolore dicta praesentium officia, eligendi nulla placeat iste vitae, tempore ab laudantium non officiis optio harum ratione autem minus voluptate voluptatum nostrum dolor, nisi sit. Quas nobis tempora neque vitae quos laborum odit tenetur suscipit ratione culpa incidunt delectus, eaque voluptatibus totam nesciunt, sed sequi. Dolorum autem quisquam provident iusto fugiat consequuntur nisi asperiores molestias similique delectus quas harum deleniti recusandae, officia est maiores? In iure voluptatum tenetur voluptatibus atque, ex velit quis accusamus non nesciunt unde illum quibusdam officia!</SlideItem>
          <SlideItem index={2}>2</SlideItem>
          <SlideItem index={3}>3</SlideItem>
          <SlideItem index={4}>4</SlideItem>
        </SlideContent>
      </Slide>
    </div>
  );
}
